import React, { useState, useContext, useEffect } from 'react'
                    
import { TextField, Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import useStyles from './FormStyle'
import {ExpenseTrackerContext} from '../../../Context/Context'
import {addTransaction}  from '../../../Context/Actions'
import {v4 as uuidv4} from 'uuid'
import { expenseCategories, incomeCategories } from '../../../constants/Categories'
import { formateDate } from '../../../utils/formatDate'
import { useSpeechContext } from '@speechly/react-client'
import CoustomizeSnackbar from '../../SnackBar/CoustomizeSnackbar'

const Form = () => {
    const classes = useStyles()
    const [type, setType] = useState('Income')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(formateDate(new Date()))
    const [open, setOpen] = useState(false)

    const[ { transactions}, dispatch]= useContext(ExpenseTrackerContext)
     const {segment }  = useSpeechContext()

     const unvalid = isNaN(amount) || amount === 0 || !date.includes('-') || !amount || !category || !type
    const handleClick = () => {
        if(unvalid) return
        const trans = {amount, type, category,date: formateDate(date), id: uuidv4() }
        addTransaction(trans, dispatch)
        setOpen(true)

        clearState();
    }
    const clearState = () => {
        setType('Income')
        setCategory('')
        setAmount('')
        setDate(formateDate(new Date()))
    } 

    const speechlyHandle = () => {
      
            if(segment){
                if(segment.intent.intent === 'add_expense'){
                    setType('Expense')
                }else if(segment.intent.intent === 'add_income'){
                    setType('Income')
                }else if(segment.isFinal && segment.intent.intent === 'create_transaction') return handleClick()
                else if(segment.isFinal && segment.intent.intent === 'cancel_transaction') return clearState()
        
                segment.entities.forEach(e => {
                    const categoryCC = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                    switch(e.type){
                        case 'amount' : setAmount(Number(e.value) !== NaN ? Number(e.value) : 0); break;
                        case 'category' :  
                        if(expenseCategories.map(i => i.type).includes(categoryCC)){setType('Expense'); setCategory(categoryCC);}
                        else if(incomeCategories.map(i => i.type).includes(categoryCC)){ setType('Income') ;  setCategory(categoryCC);}
                        break;
                        case 'date' : setDate(formateDate(e.value)); break;
                        default : break;
                    }
                })
                if(segment.isFinal && type && category && amount && date){
                    handleClick();
                }
            }
        }
    
    useEffect(() => {
    speechlyHandle();
    }, [segment])

    const categories = type === 'Income' ? incomeCategories : expenseCategories
    return (
        <Grid container spacing={2}>
            <CoustomizeSnackbar open={open} setOpen ={setOpen} />
            <Grid item xs={12} >
                <Typography align='center' variant='subtitle2' gutterBottom >
                    {segment && segment.words.map(w=> w.value).join(' ') }
                </Typography>
            </Grid>
            <Grid item xs={6} >
               <FormControl fullWidth>
                   <InputLabel> Type</InputLabel>
                   <Select value={type} onChange={(e)=> setType(e.target.value)}> 
                       <MenuItem value='Income'>Income</MenuItem>
                       <MenuItem value='Expense'>Expense</MenuItem>
                   </Select>
               </FormControl>
            </Grid>
            <Grid item xs={6} >
               <FormControl fullWidth>
                <InputLabel> Category </InputLabel>
                <Select value={category} onChange={(e)=> setCategory(e.target.value)}> 
                    {categories?.map(cat=><MenuItem  key={cat.type} value={cat.type}>{cat.type}</MenuItem>)}
                </Select>
               </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type='Number' label='Amount' fullWidth value={amount} onChange={(e)=> setAmount(e.target.value)} /> 
            </Grid>
            <Grid item xs={6}>
                <TextField type='date' label='Date' fullWidth value={date} onChange={(e)=> setDate(formateDate(e.target.value))}  /> 
            </Grid>
            <Button className={classes.button} variant='outlined' color='primary' disabled={unvalid} fullWidth onClick={(e)=>handleClick(e)}>Create</Button>
        </Grid>
    )
}

export default Form
