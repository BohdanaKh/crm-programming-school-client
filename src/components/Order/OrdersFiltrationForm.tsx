import {FC, useEffect, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {ECourse, ECourseFormat, ECourseType, EStatus, IOrder} from "../../interfaces";
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
            <input  className={css.formInut} type="text" placeholder={'email'} {...register('email')}onChange={(event) => setSearchParams(params => { params.set('email', event.target.value);
                return params})}/>

            <input  className={css.formInut} type="text"placeholder={'phone'} {...register('phone')}onChange={(event) => setSearchParams(params => { params.set('phone', event.target.value);
                return params})}/>

            <input  className={css.formInut} type="text" placeholder={'age'} {...register('age')}onChange={(event) => setSearchParams(params => { params.set('age', event.target.value);
                return params})}/>

        <select className={css.formInut} {...register('course')}onChange={(event) => setSearchParams(params => { params.set('course', event.target.value);
                return params})}>
            <option defaultValue="" >all courses</option>
            <option value={ECourse.FS}>{ECourse.FS}</option>
            <option value={ECourse.QACX}>{ECourse.QACX}</option>
            <option value={ECourse.JCX}>{ECourse.JCX}</option>
            <option value={ECourse.JSCX}>{ECourse.JSCX}</option>
            <option value={ECourse.FE}>{ECourse.FE}</option>
            <option value={ECourse.PCX}>{ECourse.PCX}</option>
        </select>

        <select  className={css.formInut} {...register('course_format')}onChange={(event) => setSearchParams(params => { params.set('course_format', event.target.value);
                return params})}>
            <option defaultValue="">all formats</option>
            <option value={ECourseFormat.static}>{ECourseFormat.static}</option>
            <option value={ECourseFormat.online}>{ECourseFormat.online}</option>
        </select>

        <select  className={css.formInut} {...register('course_type')}onChange={(event) => setSearchParams(params => { params.set('course_type', event.target.value);
                return params})}>
            <option defaultValue="">all types</option>
            <option value={ECourseType.pro}>{ECourseType.pro}</option>
            <option value={ECourseType.minimal}>{ECourseType.minimal}</option>
            <option value={ECourseType.premium}>{ECourseType.premium}</option>
            <option value={ECourseType.incubator}>{ECourseType.incubator}</option>
            <option value={ECourseType.vip}>{ECourseType.vip}</option>
        </select>

            <select  className={css.formInut} {...register('status')} onChange={(event) => setSearchParams(params => { params.set('status', event.target.value);
                return params})}>
                <option defaultValue="all statuses">all statuses</option>
                <option value={EStatus.In_work}>{EStatus.In_work}</option>
                <option value={EStatus.New}>{EStatus.New}</option>
                <option value={EStatus.Aggre}>{EStatus.Aggre}</option>
                <option value={EStatus.Disaggre}>{EStatus.Disaggre}</option>
                <option value={EStatus.Dubbing}>{EStatus.Dubbing}</option>
            </select>

            <select  className={css.formInut} {...register('group')} onChange={(event) => setSearchParams(params => { params.set('group', event.target.value);
                return params})}>
                <option defaultValue="">all groups</option>
                { groups && (
                    groups.map((group) => (
                    <option key={group.id} value={group.id}>
                        {group.title}
                    </option>
                    )))}
            </select>
                <input className={css.formInut}  type="text" placeholder={'Start date'}/>
                <input  className={css.formInut} type="text" placeholder={'End date'}/>

            </div>
            <div className={css.formActions}>
            <input type="submit" value={'setSearchParams'}/>
            <input type={"checkbox"} name={'My'} value={"My"} onClick={filterMy}/>
            <button type={"button"} onClick={clearFilterForm}>CLEAR</button>
            <DownloadExcel/>
            </div>
        </form>
        </div>
);
};

export {OrdersFiltrationForm};
