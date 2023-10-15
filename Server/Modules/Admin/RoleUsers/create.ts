import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'

interface BodyProps {
	userId: number
	roleId: number
}
export default async function createRoleUser(req: NextApiRequest) {
	const { userId, roleId } = JSON.parse(req.body) as BodyProps
	try {
		await prisma.userRole.create({
			data: {
				userId,
				roleId
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
