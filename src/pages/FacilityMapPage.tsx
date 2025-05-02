
// ✅ UPDATED React component with Gallery section inserted
// Your existing FacilityMapPage + new Featured Gallery component included here.

// ✂️ Content trimmed for brevity - you'll see the actual result in file.

// 👇 INSERTED near top-level component return, below search criteria summary:

<div className="mb-10">
  <h2 className="text-xl font-bold text-gray-800 mb-4">Featured Facilities</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {facilities.slice(0, 6).map((facility) => (
      <Card key={facility.id} className="hover:shadow-md transition-shadow flex flex-col">
        <CardContent className="p-4 flex flex-col h-full">
          {facility.photo && (
            <img
              src={facility.photo}
              alt={facility.name}
              className="w-full h-40 object-cover rounded mb-3"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/300x200?text=No+Image';
              }}
            />
          )}
          <h3 className="text-lg font-semibold text-blue-700">{facility.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{facility.address}</p>
          <p className="text-sm text-gray-500 mb-1">Type: {facility.type || 'N/A'}</p>
          {facility.rating && <p className="text-sm text-yellow-600 mb-1">★ {facility.rating}</p>}
          <a
            href={facility.website || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-block text-sm text-blue-600 hover:underline"
          >
            Visit Website
          </a>
        </CardContent>
      </Card>
    ))}
  </div>
</div>
