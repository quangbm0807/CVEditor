//components/cv-templates/Template2.jsx
const Template2 = ({ data }) => {
    const { personalInfo, sections = [] } = data;

    // Separate sections into left and right columns
    const leftSections = sections.filter(section =>
        ['skills', 'languages', 'certifications'].includes(section.type)
    );

    const rightSections = sections.filter(section =>
        ['experience', 'education', 'projects', 'achievements'].includes(section.type)
    );

    return (
        <div className="cv-template-2 flex gap-8">
            {/* Left Column - 1/3 width */}
            <div className="w-1/3 bg-gray-50 p-6 rounded-lg">
                {/* Profile Image and Contact Info */}
                <div className="text-center mb-8">
                    {personalInfo.profileImage && (
                        <div className="mb-4">
                            <img
                                src={personalInfo.profileImage}
                                alt={personalInfo.fullName}
                                className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                            />
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {personalInfo.fullName}
                    </h1>
                    {personalInfo.title && (
                        <p className="text-lg text-gray-600 mb-4">{personalInfo.title}</p>
                    )}
                    <div className="space-y-2 text-sm">
                        {personalInfo.email && (
                            <p className="flex items-center justify-center text-gray-600">
                                <span className="mr-2">📧</span> {personalInfo.email}
                            </p>
                        )}
                        {personalInfo.phone && (
                            <p className="flex items-center justify-center text-gray-600">
                                <span className="mr-2">📱</span> {personalInfo.phone}
                            </p>
                        )}
                        {personalInfo.address && (
                            <p className="flex items-center justify-center text-gray-600">
                                <span className="mr-2">📍</span> {personalInfo.address}
                            </p>
                        )}
                    </div>
                </div>

                {/* Left Column Sections */}
                {leftSections.map((section, index) => (
                    <div key={section.id || index} className="mb-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                            {section.title}
                        </h2>
                        <div className="space-y-3">
                            {section.items?.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    {renderSectionItem(section.type, item)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Column - 2/3 width */}
            <div className="w-2/3">
                {rightSections.map((section, index) => (
                    <div key={section.id || index} className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                            {section.title}
                        </h2>
                        <div className="space-y-4">
                            {section.items?.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    {renderSectionItem(section.type, item)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

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

export default Template2;