import React from 'react';
import { render } from 'react-dom';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from "autosuggest-highlight/umd/match";
import AutosuggestHighlightParse from "autosuggest-highlight/umd/parse";
import styles from "./autosuggest.css";
import { Avatar } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import {Stock_list_copy} from '../atoms/stock_list_copy'
import { NavLink } from 'react-router-dom';

const stockdata =  Stock_list_copy()
  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
  
    if (escapedValue === "") {
      return [];
    }
  
    const regex = new RegExp( escapedValue, "i");
    
    const returndata=stockdata.filter((person) => regex.test(getSuggestionValue(person)))
    console.log(returndata.slice(0,8))


    return returndata.slice(0,8)
  }
  
 // 選択した後にinput 項目に表示するテキストを決めるロジックになる。
 //戻り値は String じゃないといけない。
 //返すValueもこれに依存する
  function getSuggestionValue(suggestion) {
    //tickerを返す
    return `${suggestion.name}${suggestion.ticker} `;
  }
  
  //サジェスト項目をどのように render するか。
  function renderSuggestion(suggestion, { query }) {
    console.log("query"+query)
    const suggestionText = `${suggestion.name}${suggestion.ticker} `;

    
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    console.log(matches+"matches")
    const parts = AutosuggestHighlightParse(suggestionText, matches);
    console.log(parts+"parts")
  
    return (
      <span className={"suggestion-content "}>
        <NavLink exact to={`/stock/${suggestion.ticker}`} className={"flex items-center"}>

            <Avatar name="tickerimg" src={'https://financialmodelingprep.com/image-stock/'+suggestion.ticker+'.png'} />
            <span className="name">
            {parts.map((part, index) => {
                const className = part.highlight ? "highlight" : null;
    
                return (
                <>
                
                <span className={className} key={index}>
                    {part.text}
                </span>
                </>
                );
            })}
            </span>

        </NavLink>
      </span>
      
    );
  }
  
  export default class Autoselecter extends React.Component {
    constructor() {
      super();
  
      this.state = {
        value: "",
        suggestions: []
      };
    }
  
    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };
  
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "'AAPL'",
        value,
        onChange: this.onChange
      };
  
      return (
        <>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        </>
      );
    }
  }