export default function CompanyDetails({closePopup, selectedCountry}) {
  return (
    <div className='popup_details'>
      <div className='popup_details_header'>
        <div className='popup_details_title'>Country details</div>
        <div className='popup_details_close' onClick={closePopup}>&#10006;</div>
      </div>
      {selectedCountry.map((row, index) => {
        return (
          <div className='popup_details_row' key={index}>
            <div>{row.label}: </div>
            <div>{row.source}</div>
          </div>
        )}
      )}
    </div>
  )
}