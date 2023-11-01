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
    const dispatch=useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
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


    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setQueryParams((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));
        // @ts-ignore
        const currentParams = Object.fromEntries([...searchParams]);
        setSearchParams({...currentParams, [name]: value} )
    };

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
        <form onSubmit={null}>
            {/*<input type={"text"} name={'name'} onChange={setFilters}/>*/}
            {/*<input type={"text"} name={'surname'}/>*/}
            {/*<select name={'course'}>*/}
            {/*    <option value='FS'>FS</option>*/}
            {/*    <option value='QACX'>QACX</option>*/}
            {/*    <option value='JCX'>JCX</option>*/}
            {/*    <option value='JSCX'>JSCX</option>*/}
            {/*    <option value='FE'>FE</option>*/}
            {/*    <option value='PCX'>PCX</option>*/}
            {/*</select>*/}
            {/*<input type="submit" value={'setSearchParams'}/>*/}
        {/*<TextField  onChange={(event) => setSearchParams(prev => ({...prev, name: event.target.value}))} />*/}
    {/*<TextField  onChange={(event) => setQuery(prev => ({...prev, surname: event.target.value}))} />*/}
    {/*<TextField  onChange={(event) => setQuery(prev => ({...prev, email: event.target.value}))} />*/}
    {/*<TextField  onChange={(event) => setQuery(prev => ({...prev, phone: event.target.value}))} />*/}
    {/*<TextField  onChange={(event) => setQuery(prev => ({...prev, age: event.target.value}))} />*/}
            <TextField placeholder={'name'} name={'name'}  value={queryParams.name}
                       onChange={handleInputChange}/>
            <TextField placeholder={'surname'} name={'surname'}  value={queryParams.surname}
                       onChange={handleInputChange} />
            {/*<TextField name={'surname'} onChange={(event) => setFilters(event)} />*/}
    {/*        <TextField name={'email'} onChange={(event) => setFilters(event.target.name, event.target.value)} />*/}
    {/*        <TextField name={'phone'} onChange={(event) => setFilters(event.target.name, event.target.value)} />*/}
    {/*        <TextField name={'age'} onChange={(event) => setFilters(event)} />*/}
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={['FS',
            'QACX',
            'JCX',
            'JSCX',
            'FE',
            'PCX']}
        sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="all courses"  />}
        value={queryParams.course}
        onChange={handleInputChange}
            />
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[ 'static', 'online']}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="all formats" />}
    />
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[ 'pro',
            'minimal',
            'premium',
            'incubator',
            'vip']}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="all types" />}
    />
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[ 'In_work',
            'New',
            'Aggre',
            'Disaggre',
            'Dubbing',]}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="all statuses" />}
        // onChange={(event) => setFilters(event) }
    />
    {/*<Autocomplete*/}
    {/*    disablePortal*/}
    {/*    id="combo-box-demo"*/}
    {/*    options={all_groups}*/}
    {/*    sx={{ width: 200 }}*/}
    {/*    renderInput={(params) => <TextField {...params} label="all groups" />}*/}
    {/*/>*/}
            <input type="submit" value={'setSearchParams'}/>
        </form>

);
};

export {OrdersFiltrationForm};
