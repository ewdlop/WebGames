function TwoSlotVerticalLayout({ 
  firstComponent, 
  secondComponent, 
  className = '',
  firstProps = {},
  secondProps = {},
  containerStyle = {},
}) {
  return (
    <div 
      className={className}
      style={containerStyle}
    >
      {firstComponent && firstComponent(firstProps)}
      {secondComponent && secondComponent(secondProps)}
    </div>
  )
}

export default TwoSlotVerticalLayout 