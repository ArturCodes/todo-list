import React, { Component } from 'react'
import './item-add-form.scss'

export default class ItemAddForm extends Component {
   
   state = {
      label: ''
   }
   
   onLabelChange = (event) => {
      this.setState({
         label: event.target.value
      })
   }
   
   onSubmit = (event) => {
      const {onItemAdded} = this.props
      event.preventDefault();
      onItemAdded(this.state.label)
      this.setState({
         label: ''
      })
   }

   render() {
      return (

         <div>
            <form
               className="item-add-form d-flex"
               onSubmit={this.onSubmit}>

               <input
                  type="text"
                  className="form-control "
                  onChange={this.onLabelChange}
                  placeholder="Add to the list"
                  value={this.state.label} />

               <button
                  className="btn btn-outline-secondary form-control">
                  Add Item
               </button>

            </form>
         </div>
      )
   }
}
