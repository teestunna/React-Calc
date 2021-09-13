import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import {wti} from './constant/constants';

function App() {
	const [calculate, setCalculate] = useState("");
	const [special, setSpecial] = useState("");
	const [exponent, setExponent] = useState("");
	// const wti = wti;

	const calcOps = ['/', '*', '+', '-', '.'];

	const updateCalculation = value => {
		
		if (
			// eslint-disable-next-line
			calcOps.includes(value) && calculate === '' ||
			// eslint-disable-next-line
			calcOps.includes(value) && calcOps.includes(calculate.slice(-1))
		) {
			return;
		}

		if (value === 'Math.sqrt') {
			setSpecial(value);
		} else if (value === 'Math.pow' && calculate) {
			setSpecial(value);
			setExponent(calculate);
			setCalculate("");
		} else {
			setCalculate(calculate + value);
		}
	}

	const calcDigits = () => {
		const digits = [];

		for(let i = 1; i < 10; i++) {
			digits.push(
				<button
					label={i}
					data-testid = {i}
					onClick= {() => updateCalculation(i.toString())}
					key={i}
					>
					{i}
				</button>
			)
		}

		return digits;
	}

    const calculation = () => {
        var checkResult = ''
        if(calculate.includes('--')){
            checkResult = calculate.replace('--','+');
        } else if (special === 'Math.sqrt' && calculate) {
			checkResult = special + '(' + calculate + ')';
		} else if (special === 'Math.pow' && calculate && exponent) {
			checkResult = special + '(' + exponent + ',' + calculate + ')';
		}
        else {
            checkResult = calculate;
        }

        try {
			// eslint-disable-next-line
			setCalculate(((new Function('return ' +checkResult)()) || "" ) + "")
			setSpecial("");
			setExponent("");
        } catch (e) {
			setCalculate('Error!')
        }
    }

	const backspace = () => {
		if (calculate === '') {
			return;
		}

		const value = calculate.slice(0, -1);
		setCalculate(value);
	}

	const getprice = wti => {
		const getprice = wti.match(/(\d+)/);
		const price = getprice[0];

		setCalculate(price);
		return price;
	}

  	return (
		<div className="app-container">
			<div className="calculator">
				<div className="display">
					{ calculate || '0' }
				</div>


				<div className="operators">
					<button className="wti" label="WTI" data-testid="wti-op-button" data-tip='Get Price' onClick={() => getprice(wti)}>WTI</button>
					<button data-testid="lb-op-button" data-tip='Left bracket' onClick= {() => updateCalculation('(') }>(</button>
					<button data-testid="rb-op-button" data-tip='Right bracket' onClick= {() => updateCalculation(')') }>)</button>
					<button className="divide" data-testid="divide-op-button" data-tip='Divide' onClick= {() => updateCalculation('/')}>&divide;</button>
					<button className="mult" data-testid="mult-op-button" data-tip='Multiply' onClick= {() => updateCalculation('*')}>&#215;</button>
					<button className="add" data-testid="add-op-button" data-tip='Addition' onClick= {() => updateCalculation('+')}>&#43;</button>
					<button className="sub" data-testid="sub-op-button" data-tip='Subtract' onClick= {() => updateCalculation('-')}>&#8722;</button>
					<button className="sqrt" data-testid="sqrt-op-button" data-tip='Square Root' onClick= {() => updateCalculation('Math.sqrt')}>&#8730;</button>
					<button className="exp" data-testid="exp-op-button" data-tip='Exponent' onClick= {() => updateCalculation('Math.pow')}>&#8319;</button>
					<button className="c" label="C" data-testid="clear-op-button" data-tip='Clear' onClick= {() => setCalculate('')}>C</button>
					<button className="del" label="DEL" data-testid="del-op-button" data-tip='Backspace' onClick= {() => backspace() }>DEL</button>
				</div>

				<div className="digits">
					{ calcDigits() }
					<button onClick = {() => updateCalculation('0')}>0</button>
					<button onClick = {() => updateCalculation('.')}>.</button>

					<button className="equals" onClick = {() => calculation()}>=</button>
				</div>
			</div>
			<ReactTooltip />
		</div>
  	);
}

export default App;