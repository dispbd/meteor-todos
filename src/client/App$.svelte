<script>
import { Meteor } from 'meteor/meteor'

let name
let request
const answer = ''

async function synchronizeTeamplates() {
  // Meteor.callAsync(
  //   'synchronizeTeamplates',
  //   { name, request },
  //   (err, res) => {
  //     if (res) {
  //       answer = res
  //     }
  //   },
  // )
}
</script>

<h1 class="i-title">Video Request</h1>
<div>
  <label class="i-title" for="request">Request</label>
  <textarea
    class="i-input"
    name="request"
    id="request"
    cols="30"
    rows="10"
    bind:value={request}
  ></textarea>
</div>
<div>
  <label class="i-title" for="name">Name</label>
  <input
    class="i-input"
    type="text"
    id="name"
    name="name"
    bind:value={name}
  />
</div>
<button class="i-btn i-btn-blue" on:click={synchronizeTeamplates}>
  Submit
</button>

<header class="i-title">{answer}</header>
