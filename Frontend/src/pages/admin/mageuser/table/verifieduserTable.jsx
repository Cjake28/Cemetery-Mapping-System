import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import './verifiedusertable.css'
export default function VerifieduserTable({verifiedUser}) {
    return (
        <div className="table-wrapper">
            <table className="user-table">
                <thead className="user-table-head">
                    <tr className="user-table-row">
                        <th className="user-table-heading">Name</th>
                        <th className="user-table-heading">Username</th>
                        <th className="user-table-heading">Role</th>
                        <th className="user-table-heading">Actions</th>
                    </tr>
                </thead>
                <tbody id="user-table-body">

                    {verifiedUser.map((user)=>(
                        <tr className="user-table-row user-table-row-content">
                        <td className="user-table-cell">{user.name}</td>
                        <td className="user-table-cell">{user.username}</td>
                        <td className="user-table-cell">{user.role}</td>
                        <td className="user-table-cell">
                            <span className="user-actions">
                                <BsFillPencilFill className="edit-icon" />
                                <BsFillTrashFill className="delete-icon" />
                            </span>
                        </td>
                    </tr>
                    ))}
                    {/* <tr className="user-table-row user-table-row-content">
                        <td className="user-table-cell">cjake</td>
                        <td className="user-table-cell">cjakesupnet</td>
                        <td className="user-table-cell">user</td>
                        <td className="user-table-cell">
                            <span className="user-actions">
                                <BsFillPencilFill className="edit-icon" />
                                <BsFillTrashFill className="delete-icon" />
                            </span>
                        </td>
                    </tr> */}
                    {/* <tr className="user-table-row user-table-row-content">
                        <td className="user-table-cell">john doe</td>
                        <td className="user-table-cell">johndoe</td>
                        <td className="user-table-cell">admin</td>
                        <td className="user-table-cell">
                            <span className="user-actions">
                                <BsFillPencilFill className="edit-icon" />
                                <BsFillTrashFill className="delete-icon" />
                            </span>
                        </td>
                    </tr>
                    <tr className="user-table-row user-table-row-content">
                        <td className="user-table-cell">john doe</td>
                        <td className="user-table-cell">johndoe</td>
                        <td className="user-table-cell">admin</td>
                        <td className="user-table-cell">
                            <span className="user-actions">
                                <BsFillPencilFill className="edit-icon" />
                                <BsFillTrashFill className="delete-icon" />
                            </span>
                        </td>
                    </tr> */}
                    
                    
                </tbody>
            </table>
        </div>
    );
}
