import { NextApiRequest, NextApiResponse } from "next";

const UserApi = (
    request: NextApiRequest,
    response: NextApiResponse) => {
    const users = [
        { id: 1, name: "Nicolas" },
        { id: 2, name: "Nicolas" },
        { id: 3, name: "Nicolas" },
    ]
    return response.json(users);
}

export default UserApi;