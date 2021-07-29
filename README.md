# Wizard Component

> Created with CodeSandbox


###  Architecture 
I have a `ComponentWizard` component that is the "manager", this component is in charge of displaying the current step
* All data is persistent and share across the steps, meaning that f you clieck on previous step, you will see the data you inserted.
* All Steps have simple validation - Now only supporting simple texts.
* `Step0` has the functionality of "undo"

#### Libraries use
* React 
* Material UI
* lodash

### Useful links

* CodeSandbox link [here](https://codesandbox.io/s/wc-nvv88)
* Live version to deployed version using vercel [here](https://csb-pz12q-2dzzdn916-omher.vercel.app/)
* Github repo [here](https://github.com/OmerHerera/Wizard-Component)
