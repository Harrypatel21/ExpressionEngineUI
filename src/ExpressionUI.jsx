import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-json-pretty/themes/monikai.css';
import JSONPretty from 'react-json-pretty';

function ExpressionUI() {
    const [id ,setId] = useState(1);
    const [expressions, setExpressions] = useState({
        rules: [
            {
                rid:0,
                key:"age",
                output: {
                  value: 50,
                  operator: "=",
                  score: 500,
                },
              }  
        ],
        combinator: "and"
    });
    const [combinator, setCombinator] = useState("and");
    // console.log(expressions);

    // rules states
    const [ruleType, setRuleType] = useState('');
    const [operator, setOperator] = useState('');
    const [value, setValue] = useState('');
    const [score, setScore] = useState('');
    const [json, setJson] = useState("");

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setExpressions({ ...expressions, [name]: value });
    //   };


      const   handleSubmit = (event) => {
        event.preventDefault();
        
         setJson(JSON.stringify(expressions));
        
      };
    console.log(expressions)
      // Assuming a function to handle deletion in the UI:
const handleDeleteExpression = (indexToDelete) => {
  
  setExpressions((prevExpressions) => ({
      ...prevExpressions,
      rules: prevExpressions.rules.filter((rule) => rule.rid  !== indexToDelete),
      combinator:combinator
  }));
};

const handleAddExpression = (event, index) => {
  event.preventDefault();
  const newId = id;
  // console.log(id, "idddd");
  setExpressions((prevExpressions) => ({
      ...prevExpressions,
      rules: [
          ...prevExpressions.rules,
          {
              rid:newId ,
              key: ruleType || "age",
              output: {
                  value: value || 0,
                  operator: operator || ">",
                  score: score || 0,
              },
          },
      ],
      combinator:combinator
  }));
  setId(id+1);
  // setJson(JSON.stringify({expressions}));

};





  return (
    <form className=' container'>
      
      <div className=" container ">
        <label htmlFor="combinator" className="p-2 fw-bold">Connector Type:</label>
        <select className="form-select" aria-label="Default select example" id="combinator" value={combinator} onChange={(e) => setCombinator(e.target.value)}>
          <option value="and">AND</option>
          <option value="or">OR</option>
        </select>
      </div>
      
      {expressions.rules.map((rule, index) => (
         <div className="fw-bold form-inline" key={index} >
      <div className=" d-inline-block p-2 form-group mb-2">
        <label htmlFor="ruleType" className='p-2'>Rule Type:</label>
        <select className="form-select" aria-label="Default select example" id="ruleType" value={rule.ruleType} onChange={(e) => setRuleType(e.target.value)}>
          <option value="age">Age</option>
          <option value="credit_score">Credit Score</option>
          <option value="account_balance">Account Balance</option>
        </select>
      </div>
      <div className="d-inline-block p-2 form-group">
        <label htmlFor="operator" className='p-2'>Operator:</label>
        <select className="form-select" aria-label="Default select example" id="operator" value={rule.operator} onChange={(e) => setOperator(e.target.value)}>
              <option value=">">{'>'}</option>
              <option value="<">{'<'}</option>
              <option value=">=">{'>='}</option>
              <option value="<=">{'<='}</option>
              <option value="=">{'='}</option>
        </select>
      </div>
      <div className=" d-inline-block p-2 form-group">
        <label htmlFor="value" className='p-2'>Value:</label>
        <input className="form-control"  aria-label="Username" aria-describedby="addon-wrapping" type="number"  value={rule.value} placeholder='0' onChange={(e) => setValue(e.target.value)} />
      </div>
      <div className="d-inline-block p-2 form-group">
        <label htmlFor="score" className='p-2'>Score:</label>
        <input type="number" className="form-control"  aria-label="Username" aria-describedby="addon-wrapping"  value={rule.score } placeholder='0'  onChange={(e) => setScore(e.target.value)} />
      </div>
      <button onClick={() => handleDeleteExpression(rule.rid)} className="d-inline-block p-1.7 btn btn-danger ">Delete</button>
      
    </div>
    
       ))}
       
      <button className="btn btn-primary m-3" onClick={handleAddExpression}>Add Expression</button>
      <button type="btn" className="btn btn-success" onClick={handleSubmit}>Generate Output</button>
      <div className='container-sm'>
        <h1>Output Json</h1>
      <JSONPretty id="json-pretty" data={json}></JSONPretty>
      </div>

    </form>
  );
};


export default ExpressionUI;
