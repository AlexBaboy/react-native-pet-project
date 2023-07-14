import {sharedColors} from "./colors";
import {fontSizes} from "./fontSizes";

export const centeredView = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
}

export const modalView = {
    backgroundColor: sharedColors.white,
    borderTopLeftRadius: fontSizes['1rem'],
    borderTopRightRadius: fontSizes['1rem'],
    padding: fontSizes['1rem'],
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '20%'
}

export const buttonBlock = {
    width: '100%',
    flexDirection: 'row',
    gap: 10
}

export const button = {
    alignItems: 'center',
    borderRadius: 4,
    padding: 10,
    width: '50%',
    backgroundColor: sharedColors.blue
}

export const buttonText = {
    color: sharedColors.white,
    fontWeight: 'bold',
    textAlign: 'center',
}