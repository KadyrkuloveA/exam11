import axiosSeller from "../../axiosSeller";

export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';

export const fetchItemsSuccess = items => ({type: FETCH_ITEMS_SUCCESS, items});
export const addItemSuccess = () => ({type: ADD_ITEM_SUCCESS});
export const fetchItemSuccess = item => ({type: FETCH_ITEM_SUCCESS, item});

export const fetchItems = () => {
    return async (dispatch) => {
        const response = await axiosSeller.get('/sellPosts');
        dispatch(fetchItemsSuccess(response.data));
    };
};

export const addItem = productData => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        await axiosSeller.post('/sellPosts', productData, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(addItemSuccess());
    };
};

export const fetchItem = id => {
    return async dispatch => {
        const response = await axiosSeller.get('/sellPosts/' + id);
        dispatch(fetchItemSuccess(response.data));
    }
};