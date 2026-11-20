import { create } from "zustand";
import type { IStrapiResponse, ITeam, TTeamPayload} from "../types";
import { api } from "../api";

interface ITeamStore {
    teams?: IStrapiResponse<ITeam[]> 
    getTeams: () => Promise<void>,
    createTeam: (input: TTeamPayload) => Promise<void>,
    deleteTeam: (id: string) => Promise<void>,
}

export const useTeamsStore = create<ITeamStore>((set, get) => ({
    teams: undefined,

    getTeams: async () => {
        try {
            const res = await api.getTeams()
            set({ teams: res })
        } catch (error) {
            console.error(error)
        }
    },
    createTeam: async (input) => {
        try {
            await api.createTeam(input)
            await get().getTeams()
        } catch (error) {
            console.error(error)
        }
    },
    deleteTeam: async (id) => {
        try {
            await api.deleteTeam(id)
            await get().getTeams() 
        } catch (error) {
            console.error(error)
        }
    }
}))