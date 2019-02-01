import React, {Component, createRef} from 'react';
import SwipeToDelete from './SwipeToDelete';
import styled from 'styled-components';

const StyledContainer = styled.div`
	width: 500px;
	height: 60px;
    margin: 10px;
    background: #ddd;
    overflow: hidden;
`

const StyledContent = styled.div`
    line-height: 60px;
	background: #ddd;
    padding-left: 30px;
`

const content = [
	{title: "Galaga", id: 0},
	{title: "Metroid", id: 1},
	{title: "Ninja Gaiden", id: 2},
	{title: "Space invaders", id: 3},
	{title: "Arkanoid", id: 4},
]

class App extends Component {
	
	state = {
		content
	};
	
	containerRef = createRef();
	
	handleDelete = item => {
		const newContent = [...this.state.content];
		newContent.splice(newContent.indexOf(item), 1);
		this.setState({content: newContent});
	}
	
	render() {
		return (
			<>
				{this.state.content.map(item => (
					<StyledContainer ref={this.containerRef} key={item.id}>
						<SwipeToDelete
							onDelete={()=> this.handleDelete(item)}
						>
							<StyledContent>
								{item.title}
							</StyledContent>
						</SwipeToDelete>
					</StyledContainer>
				))}
			</>
		);
	}
}

export default App;
