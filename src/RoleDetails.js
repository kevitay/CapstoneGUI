const RoleDetails = ({role}) => {
    return (
        <div className="RoleDetails">
            {Object.keys(role).map((roleKey) => {
                return (
                    <li key={roleKey}>
                        {roleKey} - {role[roleKey]}
                    </li>
                )
                })}
        </div>
    )
}

export default RoleDetails;