import axios from "axios"
import type { ITeam, IStrapiResponse, TTeamPayload } from "./types"

export const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const apiInstance = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
})

const getTeams = async(): Promise<IStrapiResponse<ITeam[]>> => {
    const res = await apiInstance.get<IStrapiResponse<ITeam[]>>('/hltvs', {
        params: {
            populate: "*",
            sort: "VRS",
        },
    })
    return res.data
}

const createTeam = async(input: TTeamPayload): Promise<ITeam> => {
    const res = await apiInstance.post<IStrapiResponse<ITeam>>('/hltvs', { data: input })
    return res.data.data
}

const deleteTeam = async(id: string): Promise<void> => {
    await apiInstance.delete(`/hltvs/${id}`)
}

export const api = { getTeams, createTeam, deleteTeam }