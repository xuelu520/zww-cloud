package com.stylefeng.guns.rest.game.statemachine.impl;

import java.util.LinkedList;

import com.stylefeng.guns.rest.game.statemachine.config.StateConfigurer;


public class ZwwStateContext<T,S> implements StateConfigurer<T,S>{
	private LinkedList<T> stateContextList = new LinkedList<T>(); 
	private T initial ;	//初始状态
	
	@Override
	public StateConfigurer<T,S> initial(T initial) {
		this.initial = initial ;
		this.stateContextList.add(initial) ;	//首个元素
		return this;
	}

	@Override
	public StateConfigurer<T,S> state(T state) {
		this.stateContextList.add(state) ;
 		return this;
	}

	@Override
	public StateConfigurer<T,S> withStates() throws Exception {
		return this;
	}

	public LinkedList<T> getStateContextList() {
		return stateContextList;
	}

	public void setStateContextList(LinkedList<T> stateContextList) {
		this.stateContextList = stateContextList;
	}

	public T getInitial() {
		return initial;
	}

	public void setInitial(T initial) {
		this.initial = initial;
	}
}
