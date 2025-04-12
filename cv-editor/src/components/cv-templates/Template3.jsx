import { renderSectionItem } from "./Template1";

export const Template3 = ({ data = {} }) => {
    const { personalInfo = {}, sections = [] } = data || {};

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
                        {personalInfo.fullName || 'Your Name'}
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