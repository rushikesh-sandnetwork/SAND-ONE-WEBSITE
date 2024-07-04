import React from 'react';
import PageTitle from '../../../../../components/PageTitles/PageTitle';
import './AdminFormItems.css';
import FormDetailsBox from '../../../../../components/FormDetailsBox/FormDetailsBox';

const AdminFormItems = ({ formId  , setActiveTab}) => {
    return (
        <div className="form-items">
            <PageTitle title="View Form Details"></PageTitle>
            <div className="form-items-container">
                <div className="row">
                    <FormDetailsBox
                        imgSrc="https://cdn-icons-png.flaticon.com/512/993/993762.png"
                        title="VIEW DATA"
                        formId={formId}
                        url="viewFormData"
                        setActiveTab={setActiveTab}
                    />
                    <FormDetailsBox
                        imgSrc="https://cdn-icons-png.flaticon.com/512/58/58679.png"
                        title="ACCEPT DATA"
                        formId={formId}
                        url="acceptData"
                        setActiveTab={setActiveTab}

                    />
                </div>
                <div className="row">
                    <FormDetailsBox
                        imgSrc="https://cdn-icons-png.flaticon.com/512/7134/7134152.png"
                        title="REJECT DATA"
                        formId={formId}
                        url="rejectData"
                        setActiveTab={setActiveTab}

                    />
                    <FormDetailsBox
                        imgSrc="https://cdn-icons-png.flaticon.com/512/9942/9942497.png"
                        title="VIEW PROMOTERS"
                        formId={formId}
                        url="viewPromoters"
                        setActiveTab={setActiveTab}

                    />
                </div>
            </div>
        </div>
    );
}

export default AdminFormItems;
