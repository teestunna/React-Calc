import { useState } from 'react';

function App() {
	const [calculate, setCalculate] = useState("");
	const [finalresult, setFinalresult] = useState("0");

	const calcOps = ['/', '*', '+', '-', '(', ')', '=', '.'];

	const updateCalculation = value => {
		setCalculate(calculate + value);
	}

	const calcDigits = () => {
		const digits = [];

		for(let i = 1; i < 10; i++) {
			digits.push(<button onClick= {() => updateCalculation(i.toString())} key={i}>{i}</button>)
		}

		return digits;
	}

  	return (
		<div className="app-container">
			<div className="calculator">
				<div className="display">
					{ finalresult !== "0" ? <span>{ finalresult }</span> : <span>{ calculate || '0' }</span>}
				</div>


				<div className="operators">
					<button onClick= {() => updateCalculation('(')}>(</button>
					<button onClick= {() => updateCalculation(')')}>)</button>
					<button onClick= {() => updateCalculation('/')}>&divide;</button>
					<button onClick= {() => updateCalculation('*')}>&#215;</button>
					<button onClick= {() => updateCalculation('+')}>&#43;</button>
					<button onClick= {() => updateCalculation('-')}>&#8722;</button>
					<button onClick= {() => updateCalculation('Math.sqrt')}>&#8730;</button>
					<button onClick= {() => updateCalculation('Math.pow')}>&#8319;</button>
					<button onClick= {() => setCalculate('')}>C</button>
					<button>DEL</button>
				</div>

				<div className="digits">
					{ calcDigits() }
					<button onClick= {() => updateCalculation('0')}>0</button>
					<button onClick= {() => updateCalculation('.')}>.</button>

					<button>=</button>
				</div>
			</div>
		</div>
  	);
}

export default App;
