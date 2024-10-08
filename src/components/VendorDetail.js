import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './VendorDetail.css';

const firebaseUrl = 'https://new-e-learning-edecs-default-rtdb.firebaseio.com/';

const VendorDetail = () => {
    const { id } = useParams();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await fetch(`${firebaseUrl}/vendors/${id}/vendorInfo.json`);
                if (!response.ok) {
                    throw new Error('فشل تحميل البيانات: ' + response.statusText);
                }

                const data = await response.json();
                if (data && Object.keys(data).length > 0) {
                    setVendor(data);
                } else {
                    setError("لا توجد بيانات للمورد.");
                }
            } catch (error) {
                setError("حدث خطأ أثناء جلب البيانات.");
            } finally {
                setLoading(false);
            }
        };

        fetchVendorData();
    }, [id]);

    const downloadPDF = () => {
        const pdf = new jsPDF();
        const content = document.getElementById('vendor-detail');

        html2canvas(content, { useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190; // عرض الصورة
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${vendor.vendorName || 'vendor'}-info.pdf`);
        });
    };

    const getDirectImageLink = (link) => {
        if (typeof link !== 'string' || !link.includes('id=')) {
            console.error('Invalid link:', link);
            return '';
        }
        const fileId = link.split('id=')[1];
        return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    };

    if (loading) {
        return <div>جاري تحميل البيانات...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="vendor-detail" id="vendor-detail">
            <h1>{vendor.vendorName}</h1>
            <p>Email: {vendor.email}</p>
            <p>Contact Mobile: {vendor.contactMobile}</p>
            <p>Contact Person: {vendor.contactPerson}</p>
            <p>National ID: {vendor.nationalId}</p>
            <p>Tax Card: {vendor.taxCard}</p>
            <p>Swift Code: {vendor.swiftCode}</p>
            <p>Bank Account: {vendor.bankAccount}</p>
            <p>Classification: {vendor.classification}</p>
            <p>VAT: {vendor.vat}</p>
            <p>Federation: {vendor.federation}</p>
            <p>Scope of Work: {vendor.scopeOfWork}</p>
            <p>Proposed Project: {vendor.proposedProject}</p>
            <p>Prequalification: {vendor.prequalification}</p>
            <p>Remarks: {vendor.remarks}</p>
            {vendor.commercialRegistration && (
                <a 
                    href={getDirectImageLink(vendor.commercialRegistration)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    Commercial Registration Link
                </a>
            )}
            <button onClick={downloadPDF}>Download PDF</button>
        </div>
    );
};

export default VendorDetail;
