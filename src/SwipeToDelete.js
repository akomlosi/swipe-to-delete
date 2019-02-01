import React, {Component, createRef} from 'react'
import { func } from 'prop-types'
import styled from 'styled-components'


const ANIM_DELAY = 300;

const StyledSwipeItem = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: red;
`

const StyledSwipeItemContent = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    transition: 0.2s ease-out;
    z-index: 2;
`

const StyledDeleteButton = styled.div`
    position: absolute;
    right: 23px;
    font-size: 45px;
    line-height: 57px;
    z-index: 1;
    color: #fff;
`

class SwipeItem extends Component {
	
	static propTypes = {
		onDelete: func
	}
	
	static defaultProps = {
		onDelete: () => {}
	}
	
	state = {
		left: 0,
		offset: 0,
		grabbed: false
	}
	
	containerRef = createRef();
	
	delete = () => {
		const {onDelete}  = this.props;
		const {current: {offsetWidth}} = this.containerRef;
		this.setState({left: offsetWidth * -1}, () => {
			setTimeout(() => onDelete(), ANIM_DELAY)
		})
	}
	
	setSlidePosition = () => {
		let {left, grabbed} = this.state
		
		if (left < this.containerRef.current.offsetWidth / 2 * -1) {
			this.delete()
		}
		else if (left <= -80) {
			this.setState({left: -80})
		}
		else if (!grabbed) {
			this.setState({left: 0})
		}
	}
	
	grab = clientX => {
		this.setState({
			offset: this.state.left,
			clientX,
			grabbed: true
		})
	}
	
	move = x => {
		const {grabbed, clientX, offset} = this.state
		if (grabbed) {
			let left = x - clientX + offset
			if (left > 0) {
				left = 0
			}
			this.setState({left})
		}
	}
	
	drop() {
		this.setState(
			{
				clientX: 0,
				grabbed: false
			},
			this.setSlidePosition
		)
	}
	
	handleMouseDown = e => {
		e.preventDefault()
		this.grab(e.clientX)
	}
	
	handleMouseMove = e => {
		this.move(e.clientX)
	}
	
	handleMouseUp = () => {
		this.drop()
	}
	
	handleMouseLeave = () => {
		this.handleMouseUp()
	}
	
	render() {
		const {left} = this.state;
		const {children} = this.props
		return (
			<StyledSwipeItem
				ref={this.containerRef}
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onMouseLeave={this.handleMouseLeave}
				onMouseMove={this.handleMouseMove}
			>
				<StyledSwipeItemContent style={{left: `${left}px`}}>
					{children}
				</StyledSwipeItemContent>
				<StyledDeleteButton onClick={this.delete}>
					{'🗑'}
				</StyledDeleteButton>
			</StyledSwipeItem>
		)
	}
}

export default SwipeItem
