import {FC, useEffect, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {EStatus, IOrder} from "../../interfaces";
import {groupActions, orderActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {IFilter} from "../../interfaces";
import css from "./Filters.module.css";
import {DownloadExcel} from "./DownloadExcel";



const OrdersFiltrationForm: FC = () => {
    const {me} = useAppSelector(state => state.authReducer)
    const {groups} = useAppSelector(state => state.groupReducer)
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const {reset, register, handleSubmit, setValue} = useForm<IOrder>();
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        dispatch(groupActions.getAll())
    }, [dispatch])
    console.log(groups);

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
    const filter = (data:IFilter) => {
        for (const key in data) {
            // @ts-ignore
            if (data.hasOwnProperty(key) && !data[key]) {
                // @ts-ignore
                delete data[key];
            }
        }
        if (data) {
        dispatch(orderActions.getAll(data))
    }
    };

        // const currentParams = Object.fromEntries([...searchParams]);
        // setSearchParams({...currentParams, 'name': order.name} )



    const clearFilterForm = () => {
        dispatch(orderActions.getAll({page: 1}))
        reset();
        setSearchParams(prev => ({...prev, 'page': 1}))
    }

    // useEffect(() => {
    //     // @ts-ignore
    //     const currentParams = Object.fromEntries([...searchParams]);
    //     dispatch(orderActions.getAll(currentParams))
    // }, [dispatch, searchParams]);

const filterMy = () => {
        const id = me.id;
        dispatch(orderActions.getAll({page:1, managerId: id}))
    setSearchParams(params => { params.set("managerId", id.toString());
        return params})

}
    return (
        <div className={css.Filters}>
        <form onSubmit={handleSubmit(filter)}>
            <div className={css.formInputs}>
            <input  className={css.formInut} type={"text"} placeholder={'name'} {...register('name')} onChange={(event) =>  setSearchParams(params => { params.set("name", event.target.value);
                return params})}/>
            <input  className={css.formInut} type={"text"} placeholder={'surname'} {...register('surname')} onChange={(event) => setSearchParams(params => { params.set("surname", event.target.value);
                return params})}/>
            <input  className={css.formInut} type="text" placeholder={'email'} {...register('email')}/>

            <input  className={css.formInut} type="text"placeholder={'phone'} {...register('phone')}/>

            <input  className={css.formInut} type="text" placeholder={'phone'} {...register('age')}/>

        <select className={css.formInut} {...register('course')}>
            <option value="" selected disabled hidden>all courses</option>
            <option value='FS'>FS</option>
            <option value='QACX'>QACX</option>
            <option value='JCX'>JCX</option>
            <option value='JSCX'>JSCX</option>
            <option value='FE'>FE</option>
            <option value='PCX'>PCX</option>
        </select>

        <select  className={css.formInut} {...register('course_format')}>
            <option value="" selected disabled hidden>all formats</option>
            <option value='static'>static</option>
            <option value='online'>online</option>
        </select>

        <select  className={css.formInut} {...register('course_type')}>
            <option value="" selected disabled hidden>all types</option>
            <option value='pro'>pro</option>
            <option value='minimal'>minimal</option>
            <option value='premium'>premium</option>
            <option value='incubator'>incubato</option>
            <option value='vip'>vip</option>
        </select>

            <select  className={css.formInut} {...register('status')}>
                <option value="" selected disabled hidden>all statuses</option>
                <option value={EStatus.In_work}>{EStatus.In_work}</option>
                <option value={EStatus.New}>{EStatus.New}</option>
                <option value={EStatus.Aggre}>{EStatus.Aggre}</option>
                <option value={EStatus.Disaggre}>{EStatus.Disaggre}</option>
                <option value={EStatus.Dubbing}>{EStatus.Dubbing}</option>
            </select>

            <select  className={css.formInut} {...register(('group'))}>
                <option value="" selected disabled hidden>all groups</option>
                {/*{groups.map((group) => (*/}
                {/*    <option key={group.id} value={group.id}>*/}
                {/*        {group.title}*/}
                {/*    </option>*/}
                {/*))}*/}
            </select>
                <input className={css.formInut}  type="text" placeholder={'Start date'}/>
                <input  className={css.formInut} type="text" placeholder={'End date'}/>

            </div>
            <div className={css.formActions}>
            <input type="submit" value={'setSearchParams'}/>
            <input type={"checkbox"} value={"My"} onClick={filterMy}/>
            <button type={"button"} onClick={clearFilterForm}>CLEAR</button>
            <DownloadExcel/>
            </div>
        </form>
        </div>
);
};

export {OrdersFiltrationForm};
