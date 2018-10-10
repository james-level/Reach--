import React from "react";




const Register = () => (

  <div className="register">

{/* PROFILE INFO INPUT FORM START */}
<div class="user-input-form">
  <form>
    <fieldset>
      <legend><span class="number"></span> Basic Info</legend>
      <input type="text" name="field1" placeholder="Your Name *"></input>
      <input type="email" name="field2" placeholder="Your Location *"></input>
      <input type="text" name="field3" placeholder="Your Gender *"></input>
      <textarea name="field4" placeholder="Description"></textarea>

      <label for="job">Interests:</label>
      <select id="job" name="field5">
        <optgroup label="I'm into">
          <option value="travel">Travel</option>
          <option value="ecology">Saving The Planet</option>
          <option value="gym">Gym</option>
          <option value="animals">Animals</option>
          <option value="politics">Politics</option>
          <option value="food">Food Porn</option>
          <option value="fashion">Fashion/Beauty</option>
          <option value="sport">Sport</option>
        </optgroup>
      </select>
  </fieldset>

  <fieldset>
    <legend><span class="number"></span> Additional Info</legend>
    <textarea name="field6" placeholder="Anything else you want to disclose?"></textarea>
  </fieldset>

  <fieldset>
    <legend><span class="number"></span> Photos</legend>
    <input type="file" class="foo"></input>
  </fieldset>

  <br></br>
    <input type="submit" class="Save"></input>


  </form>
</div>


{/* PROFILE INFO INPUT FORM END */}





  </div>
);

export default Register;
