import { NextApiRequest, NextApiResponse } from "next";

const UserApi = (
    request: NextApiRequest,
    response: NextApiResponse) => {
    const id = (request.query.ids as String[]).map(v => Number(v));
    const users = [
        { id: 1, name: "Nicolas" },
        { id: 2, name: "Nicolas" },
        { id: 3, name: "Nicolas" },
    ]
    return response.json(users.filter(user => id.includes(user.id)));
}

export default UserApi;