import { ChangeContent } from "../actionTypes";

const initialState = {
    title:'hello part2'
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ChangeContent:
            return {
                ...state,
                title:action.title
            };
        default:
            return state;
    }
}
