import React from 'react';

const PageTitle = ({ title }: { title: string }) => {
    return (
        <div className='text-center py-1 border-b-2 border-muted-foreground rounded-lg w-[40%] md:w-[30%] lg:w-[20%] mx-auto'>
            <h1 className='text-lg font-bold'>{title}</h1>
        </div>
    );
};

export default PageTitle;