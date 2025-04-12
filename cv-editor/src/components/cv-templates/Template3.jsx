// components/cv-templates/Template3.jsx
const Template3 = ({ data }) => {
    const { personalInfo, sections = [] } = data;

    // Distribute sections across three columns
    const leftSections = sections.filter(section =>
        ['skills', 'languages'].includes(section.type)
    );

    const middleSections = sections.filter(section =>
        ['experience', 'education'].includes(section.type)
    );

    const rightSections = sections.filter(section =>
        ['projects', 'certifications', 'achievements'].includes(section.type)
    );

    return (
        <div className="cv-template-3 grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-3 bg-gray-900 text-white p-6 rounded-l-lg">
                {/* Profile */}
                <div className="text-center mb-8">
                    {personalInfo.profileImage && (
                        <div className="mb-4">
                            <img
                                src={personalInfo.profileImage}
                                alt={personalInfo.fullName}
                                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-700"
                            />
                        </div>
                    )}
                    <div className="space-y-2 text-sm">
                        {personalInfo.email && (
                            <p className="flex items-center justify-start text-gray-300">
                                <span className="mr-2">📧</span> {personalInfo.email}
                            </p>
                        )}
                        {personalInfo.phone && (
                            <p className="flex items-center justify-start text-gray-300">
                                <span className="mr-2">📱</span> {personalInfo.phone}
                            </p>
                        )}
                        {personalInfo.address && (
                            <p className="flex items-center justify-start text-gray-300">
                                <span className="mr-2">📍</span> {personalInfo.address}
                            </p>
                        )}
                    </div>
                </div>

                {/* Left Column Sections */}
                {leftSections.map((section, index) => (
                    <div key={section.id || index} className="mb-6">
                        <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700">
                            {section.title}
                        </h2>
                        <div className="space-y-3">
                            {section.items?.map((item, itemIndex) => (
                                <div key={itemIndex} className="text-gray-300">
                                    {renderSectionItem(section.type, item)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Middle Column */}
            <div className="col-span-5 p-6">
                {/* Name and Title */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        {personalInfo.fullName}
                    </h1>
                    {personalInfo.title && (
                        <p className="text-xl text-gray-600">{personalInfo.title}</p>
                    )}
                </div>

                {middleSections.map((section, index) => (
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

            {/* Right Column */}
            <div className="col-span-4 bg-gray-50 p-6 rounded-r-lg">
                {rightSections.map((section, index) => (
                    <div key={section.id || index} className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
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

export default Template3;