import {Users,Movies} from './FakeData.js';
import _ from 'lodash';
export const resolvers = {
	Query: {
		users: (parent, args, context, info) =>{
			if(Users) return {users : Users};
			return {message: "Yo, there was an error"}
		},

		user: (parent, args, context, info) =>{
			const id = args.id;
			const user = _.find(Users, {id: Number(id)});
			return user;
		},
		movies: () =>{
			return Movies;
		},

		movie: (parent, args) =>{
			const name = args.name;
			const movies = _.find(Movies, {name});
			return movies;
		}
	},
	Users: {
		favoriteMovies: (parent) =>{
			const movie = _.filter(Movies,(item)=>item.year>=2000 && item.year<=2020);
			return movie;
		}
	},

	Mutation:{
		createUser:(parent, args)=>{
			const user = args.input;
			const lastID = Users[Users.length -1].id;
			user.id = lastID + 1;
			Users.push(user);
			return user;
		},
		updateUser:(parent, args)=>{
			let userUpdated;
			const {id, name, age, address} = args.input;
			Users.forEach(user => {
				if(user.id === Number(id)){
					user.name = name;
					user.age = age;
					user.address = address;
					userUpdated = user;
				}
			})

			return userUpdated;
		},

		deleteUser:(parent, args)=>{
			const id = args.id;
			_.remove(Users, (user) => user.id === Number(id))
			return null;
		},
	},

	UsersTypeResult:{
		__resolveType(obj){
			if(obj.users){
				return "TypeUser"
			}
			return "ErrorUser"
		}
	}
};

