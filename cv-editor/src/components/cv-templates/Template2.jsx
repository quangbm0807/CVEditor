// src/cv-templates/Template2.jsx
const Template2 = ({ data }) => {
    const { personalInfo } = data;

    return (
        <div className="cv-template-2 flex">
            {/* Sidebar */}
            <div className="w-1/3 bg-gray-100 p-6">
                {personalInfo.profileImage && (
                    <div className="mb-6">
                        <img
                            src={personalInfo.profileImage}
                            alt={personalInfo.fullName}
                            className="w-full aspect-square rounded-full object-cover border-4 border-white"
                        />
                    </div>
                )}

                {/* Contact Information */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 uppercase">
                        Contact
                    </h2>
                    {personalInfo.email && (
                        <div className="flex items-start space-x-3 text-sm">
                            <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-800">{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-start space-x-3 text-sm">
                            <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-gray-800">{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.address && (
                        <div className="flex items-start space-x-3 text-sm">
                            <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-gray-800">{personalInfo.address}</span>
                        </div>
                    )}
                </div>

                {/* Skills or other sidebar sections */}
                {data.sections?.filter(section => section.sidebar)?.map((section, index) => (
                    <div key={section.id || index} className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">
                            {section.title}
                        </h2>
                        <div className="space-y-3">
                            {section.items?.map((item, itemIndex) => (
                                <div key={itemIndex} className="text-sm text-gray-800">
                                    {renderSidebarItem(section.type, item)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-6">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {personalInfo.fullName}
                    </h1>
                    {personalInfo.title && (
                        <p className="text-xl text-gray-600">{personalInfo.title}</p>
                    )}
                </header>

                {/* Main sections */}
                {data.sections?.filter(section => !section.sidebar)?.map((section, index) => (
                    <div key={section.id || index} className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {section.title}
                        </h2>
                        <div className="space-y-6">
                            {section.items?.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    {renderMainItem(section.type, item)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const renderSidebarItem = (type, item) => {
    switch (type) {
        case 'skills':
            return (
                <div className="flex items-center">
                    <span>{item.name}</span>
                    {item.level && (
                        <div className="ml-2 flex-1">
                            <div className="h-1.5 bg-gray-200 rounded-full">
                                <div
                                    className="h-full bg-gray-600 rounded-full"
                                    style={{ width: `${item.level}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            );
        default:
            return <div>{item.content}</div>;
    }
};

const renderMainItem = (type, item) => {
    switch (type) {
        case 'experience':
            return (
                <div className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{item.position}</h3>
                        <span className="text-sm text-gray-500">
                            {item.startDate} - {item.endDate || 'Present'}
                        </span>
                    </div>
                    <p className="text-gray-600 mb-2">{item.company}</p>
                    <p className="text-gray-800">{item.description}</p>
                </div>
            );
        case 'education':
            return (
                <div className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{item.school}</h3>
                        <span className="text-sm text-gray-500">
                            {item.startDate} - {item.endDate}
                        </span>
                    </div>
                    <p className="text-gray-600">{item.degree}</p>
                </div>
            );
        default:
            return <p>{item.content}</p>;
    }
};

export default Template2;