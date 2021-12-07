import {Value as REValue, People, App as REApp, Output as REOutput, If as REIf, AddS, StyliseN, AppleFontFamilyList } from 'reactive-essays';
import 'reactive-essays/styles/styles.css'

const App = () => {
  return (
	<REApp style={{padding: "100px",
				  fontFamily: AppleFontFamilyList, 
				  lineHeight: 1.15,
				  fontSize: "15px"}}>
		
		If I eat <REValue id="var1" unit="chocolate chip cookie" minValue={1} maxValue={1000} value={3} scalingRate={1} />, I will consume <REOutput refs="var1" unit="calorie" getValue={78} sdf="sdf" />. This is <REOutput refs="var1" 
		getValue={function (inputvals) {
			return inputvals.var1 * 78 - 2500;
		}} 
		getActualUnit={(val) => {

			if (val > 0) {
				return AddS("calorie", val) + " over the daily recommended value"
			} else {
				return "";
			} 
			
		}} 
		getOutputText={(val, unit) => {

			if (unit !== "") {
				return StyliseN(val) + " " + unit;
			} else {
				return "within the daily recommended calorie consumption"
			}
		}} />.<br /> <br />
		<REIf refs="var1" statement={(data) => {
			//console.log(data);
			return data.var1 * 78 > 2500;
		}}>
			My gosh. You eat way too much.
		</REIf>
	</REApp>
  );
};

export default App;