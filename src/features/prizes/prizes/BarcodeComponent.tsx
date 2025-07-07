import React from 'react';
import JsBarcode from 'jsbarcode';
import { BarcodeContainer } from './style';

type BarcodeProps = {
    barcode: string;
};

const BarcodeComponent: React.FC<BarcodeProps> = ({ barcode }) => {
    const barcodeRef = React.useRef(null);

    React.useEffect(() => {
        if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, barcode, {
                format: 'CODE128',
                displayValue: true,
                fontSize: 18,
                height: 100,
                width: 2,
                margin: 10,
                background: "#ffffff",
                lineColor: "#000000",
            });
        }
    }, [barcode]);

    return (
        <BarcodeContainer>
            <svg ref={barcodeRef} />
        </BarcodeContainer>
    );
};


export default BarcodeComponent;
