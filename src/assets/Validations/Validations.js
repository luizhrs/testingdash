import React from 'react'

import {
    Box,
    Button,
    Checkbox,
    Col,
    ControlFeedback,
    FormCheck,
    FormCheckLabel,
    FormGroup,
    Input,
    Label,
    Radio,
    RadioGroup,
    Row,
    Select,
    Textarea,
    Typography
  } from '@smooth-ui/core-sc'

import { Form, Field } from "react-final-form"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


// ****************************************
//⬇️ THIS IS WHERE ALL THE MAGIC HAPPENS ⬇️
// ****************************************
const adapt /* ⬅️ this is a HOC */ = Component => ({
  input,
  meta: { valid },
  ...rest
}) => <Component {...input} {...rest} valid={valid} />;
const AdaptedInput = adapt(Input);
const AdaptedCheckbox = adapt(Checkbox);
const AdaptedRadio = adapt(Radio);
const AdaptedTextarea = adapt(Textarea);

const normalizeRG = value => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length <= 2) return onlyNums;
  if (onlyNums.length <= 5)
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}`;
  if (onlyNums.lenght <= 8)
    return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(5, 8)}`;
  return `${onlyNums.slice(0, 2)}.${onlyNums.slice(2, 5)}.${onlyNums.slice(5, 8)}-${onlyNums.slice(8, 9)}`;
}

const normalizeCPF = value => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 3)
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}`;
  if (onlyNums.lenght <= 9)
    return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(6, 9)}`;
  return `${onlyNums.slice(0, 3)}.${onlyNums.slice(3, 6)}.${onlyNums.slice(6, 9)}-${onlyNums.slice(9, 11)}`;
}

// ****************************************
//⬆️ THIS IS WHERE ALL THE MAGIC HAPPENS ⬆️
// ****************************************

const required = value => (value ? undefined : "Required");

const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)

const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const simpleMemoize = fn => {
  let lastArg
  let lastResult
  return arg => {
    if (arg !== lastArg) {
      lastArg = arg
      lastResult = fn(arg)
    }
    return lastResult
  }
}

const documentoUtilizado = simpleMemoize(async value => {

  if (!value) {
    return 'Required'
  }
  await sleep(400)
  if (
    ~['12.345.678-9'].indexOf(value /*&& value.toLowerCase()*/)
  ) {
    return 'Username taken!'
  }
})

export { sleep,
         AdaptedInput, 
         AdaptedCheckbox, 
         AdaptedTextarea, 
         AdaptedRadio, 
         normalizeRG, 
         normalizeCPF,
         Error,
         required,
         mustBeNumber,
         minValue,
         composeValidators,
         documentoUtilizado
        }