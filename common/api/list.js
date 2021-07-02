import $http from "../http.js"
export const getlabel = (data) =>{
	return $http({
		url:'getlabel',
		data
	})
}
