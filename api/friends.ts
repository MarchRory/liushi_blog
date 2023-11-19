import httpRequest from "~/utils/http";
import { pageParamsModel } from "./types/index";
import { friendsResultModel } from "./types/friends";
enum API {
    friendsList = '/front/friends'
}

export const getFriendsListAPI = async (friendsParams: pageParamsModel) => {
    return await httpRequest.get<friendsResultModel>(API.friendsList, friendsParams)
}

