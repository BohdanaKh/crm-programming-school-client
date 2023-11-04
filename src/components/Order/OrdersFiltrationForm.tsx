import {FC, useEffect, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IOrder} from "../../interfaces";
import {Autocomplete, TextField} from "@mui/material";
import {orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

interface IProps {

}

const OrdersFiltrationForm: FC<IProps> = () => {
    const { name,
        surname,
        email,
        phone,
        age,
        course,
        course_format,
        course_type,
        status,
        group} = useAppSelector(state => state.orderReducer)
    const dispatch=useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const {reset, register, handleSubmit, setValue} = useForm<IOrder>();
    const [queryParams, setQueryParams] = useState({
        sort: null,
        name: null,
        surname: null,
        email: null,
        phone: null,
        age: null,
        course: null,
        course_format: null,
        course_type: null,
        status: null,
        group: null,
    });

    useEffect(() => {
        if (name) {
            setValue('name', name);
        }
        if (surname){
            setValue('surname', surname)}
    }, [name, surname, setValue])
    // const handleInputChange = (event: any) => {
    //     const { name, value } = event.target;
    //     setQueryParams((prevParams) => ({
    //         ...prevParams,
    //         [name]: value,
    //     }));
    //     // @ts-ignore
    //     const currentParams = Object.fromEntries([...searchParams]);
    //     setSearchParams({...currentParams, [name]: value} )
    // };

    const handleInputChange = (order: IOrder) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
           "name": order.name,
        }));
        // @ts-ignore
        const currentParams = Object.fromEntries([...searchParams]);
        setSearchParams({...currentParams, 'name': order.name} )
    };


    const clearFilterForm = (e: any) => {
        reset();
    }

    const queryParamStrings = [];
    for (const key in queryParams) {
        // @ts-ignore
        if (queryParams[key]) {
            // @ts-ignore
            queryParamStrings.push(`${key}=${encodeURIComponent(queryParams[key])}`);
        }
    }

    // if (queryParamStrings.length > 0) {
    //     url += `?${queryParamStrings.join('&')}`;
    // }


    useEffect(() => {
        // @ts-ignore
        const currentParams = Object.fromEntries([...searchParams]);
        dispatch(orderActions.getAll(currentParams))
    }, [dispatch, searchParams]);


    return (
        // <form onSubmit={null}>
        <form onSubmit={handleSubmit(handleInputChange)}>
            <input type={"text"} placeholder={'name'} {...register('name')} onChange={(event) => dispatch(orderActions.setName(event.target.value))}/>
            <input type={"text"} placeholder={'surname'} {...register('surname')} onChange={(event) => dispatch(orderActions.setSurname(event.target.value))}/>
            {/*<input type={"text"} name={'surname'}/>*/}
            {/*<select name={'course'}>*/}
            {/*    <option value='FS'>FS</option>*/}
            {/*    <option value='QACX'>QACX</option>*/}
            {/*    <option value='JCX'>JCX</option>*/}
            {/*    <option value='JSCX'>JSCX</option>*/}
            {/*    <option value='FE'>FE</option>*/}
            {/*    <option value='PCX'>PCX</option>*/}
            {/*</select>*/}
// two below work
            {/*<TextField placeholder={'name'} name={'name'}  value={queryParams.name}*/}
            {/*           // onChange={handleInputChange}/>*/}
            {/*<TextField placeholder={'surname'} name={'surname'}  value={queryParams.surname}*/}
            {/*           // onChange={handleInputChange} />*/}


    {/*<Autocomplete*/}
    {/*    disablePortal*/}
    {/*    id="combo-box-demo"*/}
    {/*    options={['FS',*/}
    {/*        'QACX',*/}
    {/*        'JCX',*/}
    {/*        'JSCX',*/}
    {/*        'FE',*/}
    {/*        'PCX']}*/}
    {/*    sx={{ width: 200 }}*/}
    {/*        renderInput={(params) => <TextField {...params} label="all courses"  />}*/}
    {/*    value={queryParams.course}*/}
    {/*    // onChange={handleInputChange}*/}
    {/*        />*/}
    {/*<Autocomplete*/}
    {/*    disablePortal*/}
    {/*    id="combo-box-demo"*/}
    {/*    options={[ 'static', 'online']}*/}
    {/*    sx={{ width: 200 }}*/}
    {/*    renderInput={(params) => <TextField {...params} label="all formats" />}*/}
    {/*/>*/}
    {/*<Autocomplete*/}
    {/*    disablePortal*/}
    {/*    id="combo-box-demo"*/}
    {/*    options={[ 'pro',*/}
    {/*        'minimal',*/}
    {/*        'premium',*/}
    {/*        'incubator',*/}
    {/*        'vip']}*/}
    {/*    sx={{ width: 200 }}*/}
    {/*    renderInput={(params) => <TextField {...params} label="all types" />}*/}
    {/*/>*/}
    {/*<Autocomplete*/}
    {/*    disablePortal*/}
    {/*    id="combo-box-demo"*/}
    {/*    options={[ 'In_work',*/}
    {/*        'New',*/}
    {/*        'Aggre',*/}
    {/*        'Disaggre',*/}
    {/*        'Dubbing',]}*/}
    {/*    sx={{ width: 200 }}*/}
    {/*    renderInput={(params) => <TextField {...params} label="all statuses" />}*/}
    {/*    // onChange={(event) => setFilters(event) }*/}
    {/*/>*/}
    {/*<Autocomplete*/}
    {/*    disablePortal*/}
    {/*    id="combo-box-demo"*/}
    {/*    options={all_groups}*/}
    {/*    sx={{ width: 200 }}*/}
    {/*    renderInput={(params) => <TextField {...params} label="all groups" />}*/}
    {/*/>*/}
            <input type="submit" value={'setSearchParams'}/>
            <button type={"button"} onClick={clearFilterForm}>CLEAR</button>
        </form>

);
};

export {OrdersFiltrationForm};
