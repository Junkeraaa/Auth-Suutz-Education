import { ApplicationRequest, IRole } from "../../common/interfaces";


const canPerformAction = (req: ApplicationRequest, roleRequiredToPerformAction: IRole[keyof IRole]): boolean => {
    if(req.user.role !== roleRequiredToPerformAction) {
        throw new Error('Cannot perform this action, unauthorized!');
    }
    return true
}


export default canPerformAction;