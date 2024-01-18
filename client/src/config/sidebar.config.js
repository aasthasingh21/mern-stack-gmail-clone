import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';


const SIDEBAR_DATA = [
    {
        name: 'inbox',
        title: 'Inbox',
        icon: InboxIcon
    },
    {
        name: 'starred',
        title: 'Starred',
        icon: StarBorderIcon
    },
    {
        name: 'sent',
        title: 'Sent',
        icon: SendOutlinedIcon
    },
    {
        name: 'drafts',
        title: 'Drafts',
        icon: InsertDriveFileOutlinedIcon
    },
    {
        name: 'bin',
        title: 'Bin',
        icon: DeleteOutlineIcon
    },
    {
        name: 'all mails',
        title: 'All mails',
        icon: MarkAsUnreadOutlinedIcon
    },
]

export default SIDEBAR_DATA;

