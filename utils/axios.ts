import axiosBase from 'axios'
import {config} from '@/config'

export const axios = axiosBase.create({
	baseURL: config.api_url
})
