import $http from "../http.js"
export const getlabel = (data) =>{
	return $http({
		url:'getlabel',
		data
	})
}
export const get_list = (data) =>{
	return $http({
		url:'get_list',
		data
	})
}