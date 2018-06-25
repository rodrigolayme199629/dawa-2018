import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Blog.css';
import axios from '../../axios-blog';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';

export default class Blog extends Component {
	state = {
		posts: null
	}
	componentDidMount(){
		axios.get('posts?_limit=3')
			.then(response => this.setState({
				posts: response.data
			}));
	}
	onPostClickHandler = (postId) => {
		// Aqui cambiaremos de post
		this.props.history.push('/posts/'+postId);
	}
	render(){
		let content = (<Spinner />);
		if(this.state.posts!=null){
			content = this.state.posts.map(item => {
				return (<Post
					key={item.id}
					postId={item.id}
					title={item.title}
					userId={item.userId}
					clicked={this.onPostClickHandler} />);
			});
		}
		return(<div className={classes.Blog}>
			{content}
			<br />
			<hr />
			<Route path="/posts/:id" component={FullPost} />
		</div>);
	}
}