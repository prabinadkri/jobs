import './List.css'
import React, { Component } from 'react'
import moment from 'moment';
import TagsInput from 'react-tagsinput';

export class List extends Component {
  getTime = (date) => {
    let result = moment(date).fromNow();
    const now = moment();
    const days = now.diff(date, 'days');
    const weeks = now.diff(date, 'weeks');
    if (days >= 7) {
      if (days <= 13) {
        result = `1w ago`;
      } else if (days > 13 && days <= 365) {
        result = `${weeks}w ago`;
      }
    }
    return result;
  };
  constructor(){
    moment.updateLocale('en', {
      relativeTime : {
          future: "in %s",
          past:   "%s ago",
          s  : 'a few seconds',
          ss : '%dseconds',
          m:  "1 min",
          mm: "%dmin",
          h:  "1h",
          hh: "%dh",
          d:  "1d",
          dd: "%dd",
          w:  "1w",
          ww: "%dw",
          M:  "1 month",
          MM: "%d months",
          y:  "1 y",
          yy: "%dy"
      }
  });
  
    super();
   
   this.state={
     jobs: [],
     tags:[],
     loading: false,
     i:0,
     j:0
     
   }
 }
 handleOnChange=(tags)=>{
  this.setState({tags});
  console.log(tags);
 }
 clearTag=()=>
 {
  this.setState({tags:[]});
  console.log("clear");
 }
 async componentDidMount()
  {
    let url=`https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json`;
    this.setState({loading:true});
    let data= await fetch(url);
    let udata=await data.json();
    console.log(udata);
    this.setState({jobs: udata.sort((a,b)=>b.posted_on-a.posted_on),loading:false});

  }
  render() {
    return (
      <div className='container'>
        <TagsInput 
        inputProps={{
          placeholder: 'Search tags..',
        
        }}
        className='tag-box react-tagsinput'
        
        maxTags={10}
        value={this.state.tags}
        onChange={this.handleOnChange}>

          
        </TagsInput>
        {(this.state.tags&&this.state.tags.length>0) && <div className='clear' onClick={this.clearTag}>Clear</div>}
      <ul>
      {this.state.loading &&<div className='loader'></div>}
      {!(this.state.loading)&&this.state.jobs.filter(job=>this.state.tags.every((keys)=>job.keywords.map(ke=>ke.toLowerCase()).includes(keys.toLowerCase()))).map((element)=>{
        {this.state.i+=1}
        return <li key={this.state.i} style={{borderLeft:`5px solid ${(new Date().getTime()-element.posted_on<9*(86400000))?'#3fb4a3':'white'}`}}> {/*Border criteria is set based on feature */}
        <span className='photo'><img src={element.company_logo}></img></span>
            <span className='company'>{element.company}</span>
            <span className='postname'>{element.position}</span>
            <small className='timing'>{this.getTime(element.posted_on)} &emsp;•&emsp; {element.timing} &emsp;•&emsp; {element.location}</small>
            <span className='features'>
              {element.keywords.map((e)=>{
                {this.state.j+=1}
                return <div className='lifeatures' key={this.state.j}> {e}</div>
              }
              )}
              
              </span>
              {(new Date().getTime()-element.posted_on<10*(86400000))&&<div className='new'>NEW!</div>}     {/* show 'new' tag for the time posted less than 10 days */}
           {(new Date().getTime()-element.posted_on<9*(86400000))&&<div className='featured'>FEATURED</div>} {/*This will show featured tag if job's featured value has true in this case post that are uploaded within last 9 days is featured */}
        </li>
        
      })} 


      </ul>
      
 
      
  
    </div>
    )
  }
}

export default List

