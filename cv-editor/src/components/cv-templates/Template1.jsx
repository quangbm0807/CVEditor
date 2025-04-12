// components/cv-templates/Template1.jsx
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

// Template section renderers
export const renderSectionItem = (type, item) => {
    switch (type) {
        case 'experience':
            return (
                <div className="mb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold">{item.position}</h3>
                            <p className="text-gray-600">{item.company}</p>
                        </div>
                        <p className="text-gray-500 text-sm">
                            {item.startDate} - {item.endDate || 'Hiện tại'}
                        </p>
                    </div>
                    <p className="mt-2 text-gray-700">{item.description}</p>
                    {item.achievements && (
                        <p className="mt-2 text-gray-700">{item.achievements}</p>
                    )}
                </div>
            );

        case 'education':
            return (
                <div className="mb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold">{item.school}</h3>
                            <p className="text-gray-600">{item.degree}</p>
                            {item.field && (
                                <p className="text-gray-600">{item.field}</p>
                            )}
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 text-sm">
                                {item.startDate} - {item.endDate}
                            </p>
                            {item.gpa && (
                                <p className="text-gray-600">GPA: {item.gpa}</p>
                            )}
                        </div>
                    </div>
                </div>
            );

        case 'projects':
            return (
                <div className="mb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-gray-600">{item.role}</p>
                        </div>
                        <p className="text-gray-500 text-sm">
                            {item.startDate} - {item.endDate || 'Hiện tại'}
                        </p>
                    </div>
                    <p className="mt-2 text-gray-700">{item.description}</p>
                    {item.technologies && (
                        <p className="mt-2 text-gray-600">
                            <span className="font-medium">Công nghệ: </span>
                            {item.technologies}
                        </p>
                    )}
                    {item.link && (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 text-blue-600 hover:text-blue-800"
                        >
                            Xem dự án
                        </a>
                    )}
                </div>
            );

        case 'skills':
            return (
                <div className="mb-2 flex items-center">
                    <span className="font-medium flex-1">{item.name}</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${item.level}%` }}
                        />
                    </div>
                </div>
            );

        case 'certifications':
            return (
                <div className="mb-3">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.issuer}</p>
                    <p className="text-gray-500 text-sm">
                        Ngày cấp: {item.date}
                        {item.expiry && ` • Hết hạn: ${item.expiry}`}
                    </p>
                    {item.credentialId && (
                        <p className="text-gray-500 text-sm">ID: {item.credentialId}</p>
                    )}
                </div>
            );

        case 'languages':
            return (
                <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">{item.language}</span>
                    <span className="text-gray-600">{item.proficiency}</span>
                </div>
            );

        case 'achievements':
            return (
                <div className="mb-3">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    {item.date && (
                        <p className="text-gray-500 text-sm">{item.date}</p>
                    )}
                </div>
            );

        default:
            return <p>{item.content}</p>;
    }
};

export default Template1;