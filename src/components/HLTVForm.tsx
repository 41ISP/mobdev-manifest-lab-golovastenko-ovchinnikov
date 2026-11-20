import { useState } from "react"
import type { TTeamInput, TTeamPayload } from "../types"
import { useTeamsStore } from "../store/useTeamsStore"
import { api } from "../api"

const initialForm: TTeamInput = {
    Name: '',
    VRS: 150,
    WonAMajor: false,
    Players: ""
}

export function HLTVForm() {
    const [form, setForm] = useState<TTeamInput>(initialForm)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onChange = <K extends keyof TTeamInput>(key: K, value: TTeamInput[K]) => {
        setForm((o) => ({ ...o, [key]: value }))
    }

    const { getTeams } = useTeamsStore()

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const payload: TTeamPayload = {
                ...form,
                Players: form.Players.split(/[,\n\r;]+/).map(p => p.trim()).filter(Boolean)
            }
            await api.createTeam(payload)
            setForm(initialForm)
            await getTeams()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="form" onSubmit={onSubmit}>
            <h2>Добавить команду</h2>

            <label className="field">
                Название*
                <input onChange={(e) => onChange('Name', e.target.value)} type="text" value={form.Name} required />
            </label>

            <label className="field">
                Игроки
                <textarea rows={5} value={form.Players} onChange={(e) => onChange('Players', e.target.value)}/>
            </label>

            <label className="field">
                Средний возраст игроков
                <input type="number" min={0} step={0.1} value={form.AveragePlayerAge ?? ''}
                    onChange={(e) => onChange('AveragePlayerAge', e.target.value ? Number(e.target.value) : undefined)}/>
            </label>

            <label className="field">
                Тренер
                <input type="text" value={form.Coach ?? ''} onChange={(e) => onChange('Coach', e.target.value)}/>
            </label>

            <label className="field">
                Призовые
                <input type="number" min={0} step={1} value={form.PrizeMoneyAmount ?? ''}
                    onChange={(e) => onChange('PrizeMoneyAmount', e.target.value ? Number(e.target.value) : undefined)} />
            </label>

            <label className="field">
                Место в VRS*
                <input type="number" min={0} step={1} value={form.VRS} onChange={(e) => onChange('VRS', Number(e.target.value))}/>
            </label>

            <label className="field">
                Выигрывали мажор?
                <select value={form.WonAMajor ? "yes" : "no"}
                onChange={(e) => onChange('WonAMajor', e.target.value === 'yes')}>
                    <option value="no">Нет</option>
                    <option value="yes">Да</option>
                </select>
            </label>
            
            <button disabled={isLoading} className="btn">{isLoading ? "Сохраняем…" : "Добавить"}</button>
        </form>
    )
}
