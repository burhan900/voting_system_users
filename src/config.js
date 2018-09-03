export const api_url = 'http://localhost:8080/api/';
export const api_auth = 'Bearer:ghjk1-29da-413b-ry88-31dcde4bwkccl';

export const getDataUser = function (){
    const data = JSON.parse(window.localStorage.getItem('user'));
    return data;
}
