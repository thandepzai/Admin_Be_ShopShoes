import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'

interface BodyProps {
	label: string
	alias: string
}
export default async function createRole(req: NextApiRequest) {
	const { label, alias } = JSON.parse(req.body) as BodyProps
	try {
		await prisma.role.create({
			data: {
				label,
				alias
			}
		})

		return {
			ok: true,
			data: true,
			msg: 'Tạo quyền thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: create.ts:27 ~ createRole ~ error:', error)
		return null
	}
}
