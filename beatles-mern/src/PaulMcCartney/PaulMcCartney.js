import React, { Component } from "react";
import "./PaulMcCartney.css";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import SongInfo from "../SongInfo"
import Icon from "@material-ui/core/Icon";
import {deleteSong} from "../ApiAccess/api"


class PaulMcCartney extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
            gets: [],
            song: "",
            lyrics: ""
         }
      }
      
      songClick=(e)=>{
        this.setState({song: e.target.getAttribute("value"), lyrics: e.target.getAttribute("datavalue")})
      }
      
    
    componentDidMount(){
      axios.get(`https://cors-anywhere.herokuapp.com/https://beatles-api.herokuapp.com/name/Paul%20McCartney`,{headers: {'Access-Control-Allow-Origin': 'dakom1-crud-api.herokuapp.com/lists'}})
      .then(res => {
        console.log(res)
        this.setState({gets: res.data})
      })
      .catch(error =>{
        console.log(error)
      })
    }
    
      render() {
        const {gets} = this.state
    
          return(
            <div>
              <div>
              Paul McCartney<br></br><br></br>
              {
            gets.length ? 
            gets.map(gets => 
            <div key={gets._id} value={gets.Song} datavalue={gets.Lyrics} onClick={this.songClick} >
              {gets.Song}
              <Icon onClick={() => deleteSong(gets._id)} color="error">delete_forever</Icon>
            </div>): 
            null
          }
            </div><div className="songLyrics">
            <SongInfo value={this.state.song} datavalue={this.state.lyrics}>Song!</SongInfo>
              </div></div>
          );
        };
}

export default PaulMcCartney
