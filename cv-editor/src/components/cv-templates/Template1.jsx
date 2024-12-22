const Template1 = ({ data }) => {
    const { personalInfo } = data;

    return (
        <div className="cv-template-1">
            {/* Header section */}
            <header className="text-center mb-8">
                {personalInfo.profileImage && (
                    <div className="mb-4 flex justify-center">
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                        />
                    </div>
                )}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {personalInfo.fullName}
                </h1>
                {personalInfo.title && (
                    <p className="text-xl text-gray-600 mb-4">{personalInfo.title}</p>
                )}
                <div className="flex justify-center space-x-4 text-gray-600">
                    {personalInfo.email && (
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {personalInfo.email}
                        </span>
                    )}
                    {personalInfo.phone && (
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {personalInfo.phone}
                        </span>
                    )}
                    {personalInfo.address && (
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {personalInfo.address}
                        </span>
                    )}
                </div>
            </header>

            {/* Content sections */}
            {data.sections?.map((section, index) => (
                <div key={section.id || index} className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                        {section.title}
                    </h2>
                    <div className="space-y-4">
                        {section.items?.map((item, itemIndex) => (
                            <div key={itemIndex} className="ml-4">
                                {/* Render different content based on section type */}
                                {renderSectionItem(section.type, item)}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const renderSectionItem = (type, item) => {
    switch (type) {
        case 'experience':
            return (
                <div>
                    <h3 className="text-lg font-semibold">{item.company}</h3>
                    <p className="text-gray-600">{item.position}</p>
                    <p className="text-gray-500 text-sm">
                        {item.startDate} - {item.endDate || 'Present'}
                    </p>
                    <p className="mt-2">{item.description}</p>
                </div>
            );
        case 'education':
            return (
                <div>
                    <h3 className="text-lg font-semibold">{item.school}</h3>
                    <p className="text-gray-600">{item.degree}</p>
                    <p className="text-gray-500 text-sm">
                        {item.startDate} - {item.endDate}
                    </p>
                </div>
            );
        default:
            return <p>{item.content}</p>;
    }
};

export default Template1;